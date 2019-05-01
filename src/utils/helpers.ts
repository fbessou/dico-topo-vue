


function capitalizeFirstLetter(str: String)
{
  return str === null || str === undefined ? '' : str.charAt(0).toUpperCase() + str.slice(1)
}

function cleanStr(str: String)
{
  return str === null || str === undefined ? '' : capitalizeFirstLetter(str.replace(/<[^>]*>/g, '').trim())
}


export {cleanStr }
