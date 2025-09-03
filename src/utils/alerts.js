import Swal from 'sweetalert2'

// Toast preset
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
})

export const alertSuccess = (title = 'Operación exitosa', text = '') =>
  Swal.fire({ icon: 'success', title, text })

export const alertError = (title = 'Ocurrió un error', text = '') =>
  Swal.fire({ icon: 'error', title, text })

export const alertInfo = (title = 'Información', text = '') =>
  Swal.fire({ icon: 'info', title, text })

export const toastSuccess = (title = 'Listo') => Toast.fire({ icon: 'success', title })
export const toastError = (title = 'Error') => Toast.fire({ icon: 'error', title })

export const confirm = async ({
  title = '¿Estás seguro?',
  text = 'Esta acción no se puede deshacer.',
  confirmButtonText = 'Sí',
  cancelButtonText = 'Cancelar',
  icon = 'warning',
  confirmButtonColor = '#3085d6',
  cancelButtonColor = '#d33',
} = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
    reverseButtons: true,
    focusCancel: true,
  })
  return result.isConfirmed
}

export const confirmLogout = () =>
  confirm({
    title: '¿Cerrar sesión?',
    text: 'Vas a salir de tu cuenta actual.',
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'Cancelar',
    icon: 'question',
    confirmButtonColor: '#0EA5E9',
    cancelButtonColor: '#6B7280',
  })

export default Swal
