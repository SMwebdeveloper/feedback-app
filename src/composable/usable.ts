import { useAuthStore } from "@/store/auth"

const store = useAuthStore()

export const usableArr = (payload: any) => {
  const result: any = []
  let myObj:any = {}
    if (typeof payload === 'object') {
        payload.forEach((item: any) => {
            store.users.forEach((user:any) => {
              if (item.userId === user.userId) {
                result.push({...item, author: {name: user.name, img:user.img}})
              } 
            })
          })
    } else {
      store.users.forEach((user:any) => {
        if (payload === user.userId) {
          myObj = { author: { name: user.name, img: user.img } }
        } 
      })
    }
    return {result, myObj}
}  