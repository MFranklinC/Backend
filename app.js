import express from 'express'; 

const app = express(); 

app.use(express.json());

const port = 3000;

try {

}catch(e) {
    console.log(e);
}

app.listen(port, () => {
    console.log('Listening to port 3000...');
});

app.get('Franklin', async (request, response) =>{
    response.status(200).json({Message: "Hello, Miss ko na s'ya -Franklin"});

});