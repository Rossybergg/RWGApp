import Swal from "sweetalert2";

export default class Notifications {

    sendToast(type, timer, title, text) {

        let iconColour = '#FFFFFF'

        switch (type) {
            case 'success':
                iconColour = '#4caf50'
                break;
            case 'error':
                iconColour = '#f44336'
                break;
            case 'warning':
                iconColour = '#ff9800'
                break;
            case 'info':
                iconColour = '#2196f3'
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
            background: '#1e1e1e',
            iconColor: iconColour,
            customClass: {
                content: 'colour: #ffffff'
            }
        })
    }

}