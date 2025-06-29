const db = require("./connection");

async function create_cart_table(){
      const sql = `
    CREATE TABLE cart (
  id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  create_time timestamp NOT NULL DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
`;
  db.query(sql, async (err, result) => {
    if (err) return console.log(err.message);
    console.log(result.message);
    alter_table("cart", "id");
    alter_table2("cart", "id");
  });
}


async function create_cartitem_table(){
      const sql = `
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  variant_id INT, 
  quantity INT DEFAULT 1,
  price_each DECIMAL(10,2) NOT NULL, 
  total_price DECIMAL(12,2) AS (quantity * price_each) STORED
);
`;
  db.query(sql, async (err, result) => {
    if (err) return console.log(err.message);
    console.log(result.message);
    alter_table("cart_items", "id");
    alter_table2("cart_items", "id");
  });
}
async function create_products_table() {
  const sql = `
    CREATE TABLE products (

  id int(11) NOT NULL,
  name varchar(255) NOT NULL,
  img_path varchar(255) NOT NULL,
  platform ENUM('psn' , 'xbox') NOT NULL,
  type ENUM('console','account'),
  create_time timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  description varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
`;
  db.query(sql, async (err, result) => {
    if (err) return console.log(err);
    console.log(result.message);
    alter_table("products", "id");
    alter_table2("products", "id");
  });
}

async function create_users_table() {
  const sql = `
    CREATE TABLE users (
  id int(11) NOT NULL,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  role varchar(255) NOT NULL,
  create_time timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

 
`;
  db.query(sql, async (err, result) => {
    if (err) return console.log(err);
    console.log(result.message);
    alter_table("users", "id");
    alter_table2("users", "id");
  });
}

async function create_productsVariant_table() {
  const sql = `
  CREATE TABLE product_variant (
  id int(11) NOT NULL,
  label varchar(255) NOT NULL,
  price decimal(2,0) NOT NULL,
  create_time timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  product_id int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


 
`;
  db.query(sql, async (err, result) => {
    if (err) return console.log(err);
    console.log(result.message);
    alter_table("product_variant", "id");
    alter_table2("product_variant", "id");
  });
}

async function create_log_table() {
  const sql = `
  CREATE TABLE log (
  id int(11) NOT NULL,
  loglevel varchar(255) NOT NULL,
  message varchar(255) NOT NULL,
  create_time timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

`;
  db.query(sql, async (err, result) => {
    if (err) return console.log(err);
    console.log(result.message);
    alter_table("log", "id");
    alter_table2("log", "id");
  });
}

async function alter_table(tablename, fieldname) {
  const sql = `
ALTER TABLE ${tablename}
  ADD PRIMARY KEY (${fieldname});
`;
  db.query(sql, async (err, result) => {
    if (err) return console.log(err);
    console.log(result.message);
  });
}

async function alter_table2(tablename, fieldname) {
  const sql = `

  ALTER TABLE ${tablename}
  MODIFY ${fieldname} int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
`;
  db.query(sql, async (err, result) => {
    if (err) return console.log(err);
    console.log(result.message);
  });
}

module.exports = {
  create_products_table,
  create_cart_table,
  create_productsVariant_table,
  create_cartitem_table,
  create_users_table,
  create_log_table,
  alter_table,
  alter_table2,
};
