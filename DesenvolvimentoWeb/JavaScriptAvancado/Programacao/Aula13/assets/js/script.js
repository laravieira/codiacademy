let inventario = [0, 0, 0, 0];

inventario[Math.floor(Math.random()*4)] = 1;

inventario.forEach((item) => {
    if(item === 1)
        alert("Pocao encontrada!");
});