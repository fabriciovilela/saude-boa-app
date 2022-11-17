export default function ApiDocumentation(){
    return(
        <div className="contentTips">
        <section>
        <h1>Uso da API Saúde Boa Receitas</h1>
        <p>Para facilitar a implementação de nossas receitas em blogs e portais, utilizando identidade visual propria, disponibilizamos uma porta de API no qual você pode consumir todos os dados de uma receita de forma aberta.</p>
        <p>Aqui você encontra um tutorial de como acessar nossa API</p>
        </section>
        <section>
        <h2>Consultar dados de uma receita via API</h2>
        <p>Segue o caminho para requerer uma receita, a informação de Id <span className="yellow">"::recipeId"</span> de uma receita pode ser encontrada na URL de cada receita ou logo abaixo do nome na página da receita.</p>
        <pre className="code"><span className="green">GET</span><br/>
        http://localhost:8000/recipes/<span className="yellow">::recipeId</span></pre>
        <p>Este é um exemplo de retorno esperado da API:</p>
        <pre className="code">
            
        {JSON.stringify({
    "_id": "636a9f8cec9c6d5708219d1f",
    "name": "Pão Simples",
    "description": "Delicioso pão simples para comer no seu café da manhã ou nos lanches",
    "createDate": "1667932044141",
    "ingredients": [
        "500g de farinha de trigo ",
        "2 colheres (chá) de sal não iodado",
        "1 colher (chá) de açúcar",
        "2 colheres (sopa) de óleo de girassol, canola ou milho",
        "300mL de água morna"
    ],
    "preparation": [
        {
            "position": 1,
            "instruction": "Misture os ingredientes secos, depois faça um buraco no meio e adicione os líquidos aos poucos (muita paciência para não encharcar a massa) misture bem",
            "_id": "636a9f8cec9c6d5708219d20"
        },
        {
            "position": 2,
            "instruction": "Amasse o pão até formar uma massa e deixe crescer coberto por 1 hora",
            "_id": "636a9f8cec9c6d5708219d21"
        },
        {
            "position": 3,
            "instruction": "Modele o pão e coloque na formapara crescer por mais 30 minutos",
            "_id": "636a9f8cec9c6d5708219d22"
        },
        {
            "position": 4,
            "instruction": "Asse por mais ou menos 40 minutosou 20 minutos se o forno estiver pré-aquecido",
            "_id": "636a9f8cec9c6d5708219d23"
        }
    ],
    "preparationTime": 90,
    "yield": "8-10 porções",
    "recipeType": {
        "_id": "63588c7e9b3d44e58f955e37",
        "typeName": "Iodoterapia"
    },
    "recipeCategory": {
        "_id": "636a9e70ec9c6d5708219d0e",
        "categoryName": "Massas"
    },
    "createBy": {
        "_id": "636a9d75ec9c6d5708219d07",
        "name": "Talitha Lima"
    },
    "__v": 0,
    "image": "base64 image",
    "credit": "@iodoterapiareceitas"
},null, 2)}



        </pre>
        </section>
        </div>
    )
}