document.getElementById('form-contato').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const formData = new FormData(document.getElementById('form-contato'));

    // Envia os dados via AJAX
    fetch('processa_formulario.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message); // Exibe mensagem de sucesso
            document.getElementById('form-contato').reset(); // Limpa o formulário
        } else {
            alert(data.message); // Exibe mensagem de erro
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar os dados.');
    });
});