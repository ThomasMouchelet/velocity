$("#formLogin").on("submit", function(event){
    event.preventDefault();
    const serializeFormLogin = $(this).serialize();
    console.log(serializeFormLogin);
    // Ajax request (checkUser.php)
    $.ajax({
        type: "post",
        url: `${urlAPI}/index.php`,
        data: serializeFormLogin,
        success: function(data){
            console.log(data);
        }
    })
})