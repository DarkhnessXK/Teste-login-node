import { create_app } from "./src/index.js"

const app = create_app()

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
