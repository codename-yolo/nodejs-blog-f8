export const convertMongodbObject = (type: 'one'| 'more', value: any ) => {
    if (type === 'more') {
        return value.map((item:Record<string, any>) => item.toObject())
    } 

    return typeof value === 'object' && !Array.isArray(value) && value.toObject()
}

export const pageNotPoundValue = {
    hiddenHeader: true,
    hiddenFooter: true,
    isNotFound: true
}