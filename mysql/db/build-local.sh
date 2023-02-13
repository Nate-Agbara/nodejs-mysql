echo "
DROP DATABASE IF EXISTS wallet;
CREATE DATABASE wallet;
GRANT ALL PRIVILEGES ON wallet.* TO root@'%';
use wallet;
" > init/wallet.sql