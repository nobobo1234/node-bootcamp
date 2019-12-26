const fs = require('fs');
const snekfetch = require('snekfetch');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file');

            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject(err);

            resolve('File written');
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        const response = await snekfetch.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );

        await writeFilePro('dog-img.txt', response.body.message);
        console.log('Random dog image saved to file!');
    } catch (err) {
        console.log(err);
    }

    return '2: READY';
};

(async () => {
    try {
        const x = await getDogPic();
        console.log(x);
    } catch (err) {
        console.log(err);
    }
})();

/*
getDogPic().then(x => {
    console.log(x);
});
*/

/*
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        return snekfetch.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);

        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log('Random dog image saved to file');
    })
    .catch(err => {
        console.log(err.message);
    });
*/
