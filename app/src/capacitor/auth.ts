import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export function create_token(token: string) {
    return SecureStoragePlugin.set({ key: "token",value:token })
}
export async function get_token() {
   try {
       let token = await SecureStoragePlugin.get({ key: "token" })
       return token.value || null
   } catch (error) {
       console.error(error)
       return null
   }
}