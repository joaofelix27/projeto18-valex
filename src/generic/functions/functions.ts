import dayjs from "dayjs"

export const getTodayDate = () => {
    return dayjs().format('MM/YY')
}
