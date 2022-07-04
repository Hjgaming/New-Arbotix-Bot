const express = require('express');
const server = express();
server.all('/', (_, res) => {
 res.end('[Arbotix Development]');
});
server.listen(8000, () => {
 console.log(
`
[INFO]: [ Arbotix   Development ]
`
);
}); 
