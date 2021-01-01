export const api_url = "http://localhost:3003/api/"
export const rootImage = "D://Project3/dating_with_my_dog/media/assets/"

export const instagram = {
   clientId: "346189446612906",
   //  redirectUri:'https://cloneinsta-398a2.firebaseapp.com/',
   // redirectUri: 'https://a052bf489711.ngrok.io/home',
   redirectUri: 'https://google.com/',
   responseType: 'code',
   scope: ['user_profile', 'user_media']

}

export const gender = {
   1: "Nam",
   2: "Nữ",
   3: "Chưa xác định"
}
export const dateFormat = 'DD/MM/YYYY';

export const app_icon = "../../icon_app.png"
export const token = 'token'
export const lettersRegex = RegExp(/^[0-9a-zA-Z]+$/);
export const phoneRegex = RegExp(/^[0-9]+$/);
export const emailRegex = RegExp(
   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


const color = {
   pink: "#fd5068",
   yellow: "",
   lightgray: ""
}