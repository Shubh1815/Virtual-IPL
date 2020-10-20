const styles = {
    root: {
        'margin-top': '50px',
        'width': '100%',
    },
    table: {
        'background-color': '#1b1b1bc4',
        'margin': '0 10px',
        'max-width': '764px',
        'min-height': '350px',
        'position': 'relative',
    },
    tableTitle: {
        'display': 'flex',
        'justifyContent': 'space-between',
        'alignItems': 'center',
        'background': '#d20000',
    },
    title: {
        'color': 'white',
        'padding': '10px',
    },
    tableHeader: {
        '& > tr > th': {
            'background-color': '#1b1a1afc',
            'color': 'white', 
        }
    },
    tableBody: {
        'min-height': '350px',
        '& > tr > td':{
            'color': 'white',
        }
    },
    img: {
        'width': '150px',
        'height': '150px',
        'position': 'absolute',
        'top': '70%',
        'left': '50%',
        'transform': 'translate(-45%, -50%)'
    }
}

export default styles