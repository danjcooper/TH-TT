console.log('hi')

async function loadDeckDataIntoMemory(inputFileLink) {

    if(inputFileLink == undefined) {
        return 'Error'
    }
    
    // Get hte file and load it into memory
    const data = await fetch(inputFileLink);
    const text = await data.text();
    
    // create an array for each line.
    let parsedText = text.split('\n');

    // Take the header line and put it into an array. this is then used to name the object elements 
    let catagories = parsedText[0].split(',');
    
    // Split each line into an array
    for (let i = 0; i < parsedText.length; i++) {
        parsedText[i] = parsedText[i].split(',')
    }

    var temp = {}
    var outputObject = []

    // start the loop at 1 to cut off the header
    for (let i = 1; i < parsedText.length; i++) {
        for (let j = 0; j < catagories.length; j++) {
            temp[catagories[j]] = parsedText[i][j]
        }
        outputObject.push(temp) // Push the temp object into the output array of objects
        temp = {} // clear Temp
    }



    console.table(outputObject)

    return outputObject
}

loadDeckDataIntoMemory('/public/data/data.csv')