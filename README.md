
# TODO APP

### Set up the repository


```bash
git clone git@github.com:gvlisidis/todo-app.git
composer install
cp .env.example .env
```

For Laravel Sail dev environment ensure that  the .env file is set to:
```bash
DB_HOST=mysql
DB_USERNAME=sail
DB_PASSWORD=password
```

```bash
sail up -d 
sail artisan key:generate
sail artisan migrate --seed
sail npm install
sail npm run dev

http://localhost
```
