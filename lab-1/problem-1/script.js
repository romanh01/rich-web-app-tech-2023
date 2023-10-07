function adjustGrid() 
{
    const windowWidth = window.innerWidth;
    const columns = document.querySelectorAll('.column');
    const innerGrids = document.querySelectorAll('.inner-grid');
    const cellPairs = document.querySelectorAll('.cell-pair');

    /* 4x1 grid */
    if (windowWidth < 640) 
    { 
        columns.forEach((column, index) => {
            column.style.order = index;
            innerGrids[index].style.flexDirection = 'column';
        });
    }
    /* 2x2 grid */
    else if (windowWidth < 960) 
    {
        cellPairs.forEach((pair, index) => {
            pair.style.order = index;
        });
    }
    /* Default 1x4 grid */
    else 
    {
        columns.forEach((column, index) => {
            column.style.order = index;
            innerGrids[index].style.flexDirection = 'row';
        });
    }

    // Display window width below (to see if grid change when needed)
    const windowWidthDisplay = document.querySelector('#windowWidthDisplay p');
    if (windowWidthDisplay) 
    {
        windowWidthDisplay.textContent = 'Window Width: ' + windowWidth + 'px';
    }
}

adjustGrid();
window.addEventListener('resize', adjustGrid);