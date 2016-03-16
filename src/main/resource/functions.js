/**
 * get key label from structure file
 * 
 * @param pdef
 */
function getExcelDataSource(pdef, pdata) {

    // check parameter
    if (!pdef) {
        return {};
    }

    // parse to json object
    if (typeof pdef === 'string') {
        pdef = JSON.parse(pdef);
    }

    // loop to get key:label object
    var keyLabel = {};
    pdef.pages.forEach(function(page) {
        page.sections.forEach(function(section) {
            section.columns.forEach(function(column) {
                column.fields.forEach(function(field) {
                    keyLabel[field.key] = field.label;
                })
            })
        });
    });
    
    // get key list & label list
    var keyList = [];
    var labelList = [];
    // use to hold all data with key and value =''
    var allDataObject = {};
    for(var key in keyLabel){
        keyList.push(key);
        labelList.push(keyLabel[key]);
        allDataObject[key] = '';
    }
    
    
    // data list, with label list as the first element
    var dataList = [];
    
    // add data
    if(pdata){
        if(typeof pdata === 'string'){
            pdata = JSON.parse(pdata);
        }
        
        pdata.forEach(function(item) {
            // get item data object
            var itemObject = JSON.parse(JSON.stringify(allDataObject));
            for(var key in item){
                itemObject[key] = item[key];
            }
            
            // get item data array
            var itemDataArray = [];
            keyList.forEach(function(key) {
                itemDataArray.push(itemObject[key]);
            });
            
            // add to data list
            dataList.push(itemDataArray);
        });
        
    }
    

    // return value, 
    // {title: [], data: [][]}
    var retVal = {};

    // set title
    retVal.title = labelList;
    
    // set data
    retVal.data = dataList;
    
    return JSON.stringify(retVal);
}

