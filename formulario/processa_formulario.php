<?php

// Importa as configurações do banco de dados
$config = require '../config/config.php';

try {
    // Conexão com o banco de dados usando as configurações
    $pdo = new PDO(
        "mysql:host={$config['host']};dbname={$config['dbname']}",
        $config['user'],
        $config['password']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recebe os dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $assunto = $_POST['assunto'];
    $mensagem = $_POST['mensagem'];

    // Validação básica
    if (empty($nome) || empty($email) || empty($telefone) || empty($assunto) || empty($mensagem)) {
        echo json_encode(['status' => 'error', 'message' => 'Preencha todos os campos.']);
        exit;
    }

    // Insere os dados no banco
    $sql = "INSERT INTO contatos (nome, email, telefone, assunto, mensagem) VALUES (:nome, :email, :telefone, :assunto, :mensagem)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nome' => $nome,
        ':email' => $email,
        ':telefone' => $telefone,
        ':assunto' => $assunto,
        ':mensagem' => $mensagem
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Dados enviados com sucesso!']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao enviar os dados: ' . $e->getMessage()]);
}