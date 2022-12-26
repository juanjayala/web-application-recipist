import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import ENV from '../../config.js'
import { deleteRecipe } from '../../actions/recipes.js';
const API_HOST = ENV.api_host

function handleDeleteRecipes(recipe_ids) {
    for (let i = 0; i < recipe_ids.length; i++) {
        deleteRecipe(recipe_ids[i]);
    }
}


const RecipeTable = () => {
    const [selectionModel, setSelectionModel] = useState([]);
    const [recipesData, setRecipesData] = useState([]);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <IconButton
                    onClick={() => handleDeleteRecipes(selectionModel)}
                >
                    <DeleteIcon />
                </IconButton>
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        fetch(`${API_HOST}/api/recipes`)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    alert("Could not get recipes");
                }
            })
            .then(data => {
                // the resolved promise with the JSON body
                setRecipesData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const columns = [
        { field: 'id', headerName: 'Recipe ID', width: 130, flex: 1 },
        { field: 'title', headerName: 'Title', width: 300, flex: 1 },
        { field: 'creator', headerName: 'Creator', width: 200, flex: 1 },
        { field: 'date', headerName: 'Date Created', width: 150, flex: 1 },
        { field: 'report', headerName: '# of Reports', width: 150, flex: 1 }
    ];

    const getRecipeInfo = (recipe) => {
        const { _id, dish_name, creator_name, date_created, reported } = recipe;
        const info = {
            id: _id, title: `${dish_name}`, creator: `${creator_name}`, date: `${date_created}`, report: reported
        }
        return info;
    }

    const rows = recipesData.map((recipe) => getRecipeInfo(recipe))



    return (
        <div style={{ height: 700, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <DataGrid
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'report', sort: 'desc' }],
                        },
                    }}
                    sx={{ backgroundColor: 'white' }}
                    rows={rows}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        setSelectionModel(ids);
                    }}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
        </div>
    );
}

export default RecipeTable;