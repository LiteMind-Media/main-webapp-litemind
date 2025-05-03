#!/bin/bash

# Set text colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}===== Google Cloud Secret Manager - Upload Secrets =====${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${YELLOW}Error: gcloud CLI is not installed. Please install Google Cloud SDK first.${NC}"
    exit 1
fi

# Check current auth status
CURRENT_ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>/dev/null)

if [ -n "$CURRENT_ACCOUNT" ]; then
    echo -e "\n${BLUE}Currently logged in as: ${YELLOW}$CURRENT_ACCOUNT${NC}"
    echo -e "${BLUE}Would you like to switch to a different account? (y/n)${NC}"
    read -p "> " SWITCH_ACCOUNT
    
    if [[ "$SWITCH_ACCOUNT" =~ ^[Yy]$ ]]; then
        echo -e "\n${BLUE}Choose an option:${NC}"
        echo -e "1) Log in with a different account"
        echo -e "2) List available accounts and select one"
        read -p "> " LOGIN_OPTION
        
        case $LOGIN_OPTION in
            1)
                echo -e "\n${BLUE}Logging in with a new account...${NC}"
                gcloud auth login
                ;;
            2)
                echo -e "\n${BLUE}Available accounts:${NC}"
                ACCOUNTS=($(gcloud auth list --format="value(account)"))
                
                for i in "${!ACCOUNTS[@]}"; do
                    echo -e "$((i+1))) ${ACCOUNTS[$i]}"
                done
                
                echo -e "\n${BLUE}Select an account by number:${NC}"
                read -p "> " ACCOUNT_NUMBER
                
                if [[ $ACCOUNT_NUMBER -ge 1 && $ACCOUNT_NUMBER -le ${#ACCOUNTS[@]} ]]; then
                    SELECTED_ACCOUNT=${ACCOUNTS[$((ACCOUNT_NUMBER-1))]}
                    echo -e "\n${BLUE}Setting active account to: ${YELLOW}$SELECTED_ACCOUNT${NC}"
                    gcloud config set account "$SELECTED_ACCOUNT"
                else
                    echo -e "${YELLOW}Invalid selection. Using current account.${NC}"
                fi
                ;;
            *)
                echo -e "${YELLOW}Invalid option. Using current account.${NC}"
                ;;
        esac
    else
        echo -e "${BLUE}Continuing with current account: ${YELLOW}$CURRENT_ACCOUNT${NC}"
    fi
else
    echo -e "${YELLOW}You are not logged in to Google Cloud. Please login now.${NC}"
    gcloud auth login
fi

# List available projects
echo -e "\n${GREEN}Available Google Cloud Projects:${NC}"
gcloud projects list --format="table(projectId,name)"

# Prompt for project selection
echo -e "\n${YELLOW}Please enter the Project ID you want to use:${NC}"
read -p "> " PROJECT_ID

# Validate project ID
if ! gcloud projects describe "$PROJECT_ID" &> /dev/null; then
    echo -e "${YELLOW}Error: Invalid project ID or you don't have access to this project.${NC}"
    exit 1
fi

# Set the project
echo -e "\n${GREEN}Setting Google Cloud project to: ${YELLOW}$PROJECT_ID${NC}"
gcloud config set project "$PROJECT_ID"

# Determine which .env file to use
echo -e "\n${YELLOW}Which .env file would you like to upload? (default: .env)${NC}"
echo -e "1) .env (production)"
echo -e "2) .env.development"
echo -e "3) .env.local"
echo -e "4) Custom file path"
read -p "> " ENV_CHOICE

case $ENV_CHOICE in
    1|"") ENV_FILE=".env" ;;
    2) ENV_FILE=".env.development" ;;
    3) ENV_FILE=".env.local" ;;
    4)
        echo -e "Enter the custom file path:"
        read -p "> " ENV_FILE
        ;;
    *)
        echo -e "${YELLOW}Invalid choice, using default .env${NC}"
        ENV_FILE=".env"
        ;;
esac

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo -e "${YELLOW}Error: $ENV_FILE file not found!${NC}"
  exit 1
fi

echo -e "\n${GREEN}Uploading secrets from $ENV_FILE to project $PROJECT_ID...${NC}"

# Read .env file and add secrets to Google Secret Manager
while IFS= read -r line || [ -n "$line" ]; do
  # Skip empty lines and comments
  if [[ -z "$line" || "$line" =~ ^# ]]; then
    continue
  fi

  # Extract key and value
  KEY=$(echo "$line" | cut -d '=' -f1)
  VALUE=$(echo "$line" | cut -d '=' -f2-)

  # Check if secret already exists
  if gcloud secrets describe "$KEY" --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo -e "Updating secret: ${YELLOW}$KEY${NC}"
    echo -n "$VALUE" | gcloud secrets versions add "$KEY" --data-file=- --project="$PROJECT_ID"
  else
    echo -e "Creating secret: ${YELLOW}$KEY${NC}"
    echo -n "$VALUE" | gcloud secrets create "$KEY" --replication-policy="automatic" --data-file=- --project="$PROJECT_ID"
  fi

done < "$ENV_FILE"

echo -e "\n${GREEN}✅ All secrets from $ENV_FILE have been uploaded successfully to project $PROJECT_ID!${NC}"
