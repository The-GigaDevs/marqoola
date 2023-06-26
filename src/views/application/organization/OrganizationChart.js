import PropTypes from 'prop-types';
import { useEffect, Fragment, useState, useCallback } from 'react';
import axios from 'utils/axios';
// material-ui
import { Grid, CardHeader, Typography } from '@mui/material';
import CardMui from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

// third-party
import { Tree, TreeNode } from 'react-organizational-chart';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import DataCard from './DataCard'
import Card from './Card';
import { openDrawer } from 'store/slices/menu';
import { useDispatch } from 'store';

// ==============================|| ORGANIZATION CHARTS ||============================== //

function SimpleTree({ name }) {
    const theme = useTheme();

    return (
        <Typography
            sx={{
                p: 2,
                border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main}`,
                width: 'max-content',
                m: 'auto',
                color: theme.palette.mode === 'dark' ? `text.secondary` : `secondary.dark`,
                bgcolor: theme.palette.mode === 'dark' ? `background.default` : `secondary.light`,
                borderRadius: 1
            }}
        >
            {name}
        </Typography>
    );
}

SimpleTree.propTypes = {
    name: PropTypes.string
};

function TreeCard({ items }) {
    return (
        <>
            {items.map((item, id) => (
                <Fragment key={id}>
                    {item.children ? (
                        <TreeNode label={<SimpleTree name={item.name} />}>
                            <TreeCard items={item.children} />
                        </TreeNode>
                    ) : (
                        <TreeNode label={<SimpleTree name={item.name} />} />
                    )}
                </Fragment>
            ))}
        </>
    );
}

TreeCard.propTypes = {
    items: PropTypes.array
};

const OrganizationChart = ({rows, open, handleCloseDialog}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    
    const [orgTree, setOrgTree] = useState([]);
    var aaa;
    const getOrgTree = useCallback(async () => {
        try {
            const response = await axios.get('/objects/organisations/treeview');
            setOrgTree(response.data[0]);
            aaa = response.data[0];
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getOrgTree();
    }, [getOrgTree]);


    useEffect(() => {
        dispatch(openDrawer(false));
        console.log(rows);
        // eslint-disable-next-line
    }, []);

    

    return (
        <Grid container rowSpacing={2} justifyContent="center">
            <Grid item md={12} lg={12} xs={12}>
                <Grid container spacing={2}>
                    <Grid item md={12} lg={12} xs={12}>
                    <MainCard  sx={{ overflow: 'auto' }}>
                            <Tree
                                lineWidth="1px"
                                lineColor={theme.palette.secondary.main}
                                lineBorderRadius="10px"
                                label={
                                    <DataCard
                                        name={orgTree.name}
                                        role={orgTree.role}
                                        id={orgTree.id}
                                        root
                                    />
                                }
                            > { orgTree.children && 
                                <Card items={orgTree.children} />
                            }
                            </Tree>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

OrganizationChart.propTypes = {
    rows: PropTypes.object,
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default OrganizationChart;
