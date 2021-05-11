const fs = require('fs');
const { processQuery } = require('../query');
const { processOutput } = require('../utils');

function firerun(inputFilepath, outputFilepath) {
    const data = fs.readFileSync(inputFilepath, 'utf8');
    const queryList = []
    const rawQueries = data.split('---');
    for(let rawQuery of rawQueries) {
        const result = processQuery(rawQuery.slice(rawQuery.indexOf('db') - 1).trim())
        queryList.push({
            name: rawQuery.trim().split('\n')[0],
            result
        });
    }
    saveResult(queryList, outputFilepath);
}

async function saveResult(queryList, outputFilepath) {
    let output = ''
    for(let query of queryList) {
        output += `\n${query.name}\n${JSON.stringify(await processOutput(query.result), null, 2)}\n`;
    }
    fs.writeFileSync(
        outputFilepath,
        output,
        'utf8',
        'a'
    )
    console.log('files written');
    process.exit();
}

module.exports = {
    firerun
}