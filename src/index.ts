import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';


// Constants
const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3000);

server.listen(port, () => {
// Start server
    logger.info(serverStartMsg + port);
});
