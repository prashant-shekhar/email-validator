# EmailValidator
This Repository checks for validity of an email 

### Installation Guidelines

1. Clone the repository

    ```
    git clone https://github.com/nikhilbhatt/EmailValidator.git
    ```
2. Install dependencies

   ```
    bundle install
    yarn install
    ```
3. Database configurations
    ```
    Create a new file serets.yml in config folder
    Copy secretsdemo.yml file content to secrets.yml
    Configure your respective username and password in config/secrets.yml
    set Database name as EmailValidator_development 
    ```


4. Create database

    ```
    rails db:create
    ```
5. Run Migrations

    ```
    rails db:migrate
    ```
5. Start contributing

    ```
    rails s
    ```
