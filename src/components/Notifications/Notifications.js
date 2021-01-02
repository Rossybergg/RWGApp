import Swal from "sweetalert2";

export default class Notifications {

    sendToast(type, timer, title, text) {

        let background = '#333333';

        switch (type) {
            case 'success':
                background = '#4caf50'
                break;
            case 'error':
                background = '#f44336'
                break;
            case 'warning':
                background = '#ff9800'
                break;
            case 'info':
                background = '#2196f3'
                break;
            default:
                break;
        }


        Swal.fire({
            toast: true,
            icon: type,
            title: title,
            text: text,
            timer: timer,
            timerProgressBar: true,
            position: 'bottom-end',
            showConfirmButton: false,
            background: background,
            iconColor: 'white'
        })
    }

}