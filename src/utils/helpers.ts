

function stripTags(str: string)
{
    return str === null || str.length === 0 ? '' : str.replace(/<[^>]*>/g, '')
}

export { stripTags }
