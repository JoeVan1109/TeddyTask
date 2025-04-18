import * as bulmaToast from 'bulma-toast';

// To use notifications
export function toast(message, type = 'is-info'){
    bulmaToast.toast({
        message,
        type,
        dismissible: true,
        animate: { in: 'bounceInUp', out: 'bounceOutDown' },
        position: 'bottom-right',
    });
}