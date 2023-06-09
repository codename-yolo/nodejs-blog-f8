type SoftDataType = {
    sortType: string,
    sortColumnName: string
}

const sortByColumn = (findBySort: any, { sortType, sortColumnName }: SoftDataType)  => {
    return findBySort.sort && findBySort.sort({[sortColumnName]: sortType})
}

export default sortByColumn