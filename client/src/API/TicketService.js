///check/:token
import axios from "axios";

export default class TicketSevice {
    static async check(token) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/ticket/check/${token}`);
        return response;
    }
    static async getOfUser(id) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/ticket/userlist/${id}`);
        return response;
    }

    static async download(id, filename) {
		axios({
			url: `https://uevent-vbondarets.pp.ua/api/ticket/dowload/${id}`, //your url
			method: 'GET',
			responseType: 'blob', // important
		  }).then((response) => {
			 const url = window.URL.createObjectURL(new Blob([response.data]));
			 const link = document.createElement('a');
			 link.href = url;
			 link.setAttribute('download', `${filename}`); //or any other extension
			 document.body.appendChild(link);
			 link.click();
		  });
    }
}