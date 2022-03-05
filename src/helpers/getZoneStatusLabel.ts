export const getZoneStatusLabel = ( status:string ) => {
    switch ( status ) {
        case 'isEditing':
            return 'En edición';
        case 'isCompleted':
            return 'Completado sin publicar';
        case 'isPublished':
            return 'Publicado';
        default:
            break;
    }
}