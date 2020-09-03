const fs = require('fs');
const path = require('path');


const getFiles = (dir, callback) => {
    fs.readdirSync(dir)
        .forEach((file) => {
            const name = path.join(dir, file);
            if( fs.statSync(name).isDirectory() ) {
                return getFiles(name, callback);
            }
            else {
                callback(dir, file);
            }
        });
}


const getContentType = (file) => {
    const ext = path.extname(file);
    if ( ext.includes('.html') ) {
        return 'text/html'
    }
    else if ( ext.includes('.js') ) {
        return 'text/javascript'
    }
    else if ( ext.includes('.json') ) {
        return 'application/json'
    }
    else if ( ext.includes('.css') ) {
        return 'text/css'
    }
    else if ( ext.includes('.jpg') ) {
        return 'image/jpeg'
    }
    else if ( ext.includes('.png') ) {
        return 'image/png'
    }
    else if ( ext.includes('.webp') ) {
        return 'image/webp'
    }
    else if ( ext.includes('.m4a') ) {
        return 'audio/x-m4a'
    }
    else if ( ext.includes('.mp4') ) {
        return 'video/mp4'
    }
    else {
        return undefined
    }
}


module.exports = { getFiles, getContentType }
