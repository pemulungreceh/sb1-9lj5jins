<?php
include_once '../config/cors.php';
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$category = isset($_GET['category']) ? $_GET['category'] : '';
$search = isset($_GET['search']) ? $_GET['search'] : '';
$book_type = isset($_GET['book_type']) ? $_GET['book_type'] : '';
$min_price = isset($_GET['min_price']) ? (float)$_GET['min_price'] : 0;
$max_price = isset($_GET['max_price']) ? (float)$_GET['max_price'] : 0;
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'created_at';
$order = isset($_GET['order']) ? $_GET['order'] : 'DESC';

$offset = ($page - 1) * $limit;

$where_conditions = ["p.is_active = 1"];
$params = [];

if (!empty($category)) {
    $where_conditions[] = "p.category_id = :category";
    $params[':category'] = $category;
}

if (!empty($search)) {
    $where_conditions[] = "(p.title LIKE :search OR p.author LIKE :search2 OR p.publisher LIKE :search3)";
    $params[':search'] = "%$search%";
    $params[':search2'] = "%$search%";
    $params[':search3'] = "%$search%";
}

if (!empty($book_type)) {
    $where_conditions[] = "p.book_type = :book_type";
    $params[':book_type'] = $book_type;
}

if ($min_price > 0) {
    $where_conditions[] = "p.price >= :min_price";
    $params[':min_price'] = $min_price;
}

if ($max_price > 0) {
    $where_conditions[] = "p.price <= :max_price";
    $params[':max_price'] = $max_price;
}

$where_clause = implode(' AND ', $where_conditions);

$query = "SELECT p.*, c.name as category_name, u.full_name as seller_name, u.address as seller_location
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          LEFT JOIN users u ON p.seller_id = u.id
          WHERE $where_clause
          ORDER BY p.$sort $order
          LIMIT :limit OFFSET :offset";

$stmt = $db->prepare($query);
foreach ($params as $key => $value) {
    $stmt->bindValue($key, $value);
}
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Get total count
$count_query = "SELECT COUNT(*) as total FROM products p WHERE $where_clause";
$count_stmt = $db->prepare($count_query);
foreach ($params as $key => $value) {
    $count_stmt->bindValue($key, $value);
}
$count_stmt->execute();
$total = $count_stmt->fetch(PDO::FETCH_ASSOC)['total'];

http_response_code(200);
echo json_encode([
    "products" => $products,
    "pagination" => [
        "page" => $page,
        "limit" => $limit,
        "total" => (int)$total,
        "pages" => ceil($total / $limit)
    ]
]);
?>