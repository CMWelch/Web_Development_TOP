import * as http from 'http';
import * as fs from 'fs';

const port = 3000;

const server = http.createServer(function(req, res) 
{
    res.writeHead(200, {'content-type' : 'text/html'});
    fs.readFile('index.html', function(error, data) {
        if(error)
        {
            res.writeHead(404);
            //Better practice to use an actual fnf page
            res.write('Error: File not found');
        }
        else
        {
            res.write(data);
        }

        res.end()
    })
})

server.listen(port, function(error) 
{
    if(error)
    {
        console.log('Something went wrong', error);
    }
    else
    {
        console.log('Server listening on ' + port);
    }
})