import PropTypes from 'prop-types';
import { useEffect, Fragment, useState, useCallback } from 'react';
import axios from 'utils/axios';
// material-ui
import { Grid, CardHeader, Typography } from '@mui/material';
import CardMui from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

// third-party
import { Tree, TreeNode } from 'react-organizational-chart';
import useAuth from 'hooks/useAuth';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import DataCard from './DataCard'
import Card from './Card';
import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';
import { getOrganisations, getOrganisationsTree } from 'store/slices/organisation';

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

const OrganizationChart = ({rows, open, setOpenDetails, setIdentifier, setActiveTab}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { organisationtree, organisations } = useSelector((state) => state.organisation);
    const { user } = useAuth();

    const [orgTree, setOrgTree] = useState([]);
    const [details, setDetails] = useState(false);
    const [details2, setDetails2] = useState({});

            

   useEffect(() => {
        setOrgTree(organisationtree);
        
   }, [organisationtree]);

    useEffect(() => {
        dispatch(getOrganisationsTree(user.accessToken));
    }, [open]);

    useEffect(() => {
        dispatch(openDrawer(false));
        dispatch(getOrganisationsTree(user.accessToken));
        dispatch(getOrganisations(user.accessToken));
        console.log(rows);
        // eslint-disable-next-line
    }, []);

    

    return orgTree && orgTree.length > 0 && (
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
                                        name={orgTree[0].name}
                                        role={orgTree[0].role}
                                        id={orgTree[0].id}
                                        root
                                        rows={rows}
                                        item={orgTree[0]}
                                        setOpenDetails={setOpenDetails}
                                        setIdentifier={setIdentifier}
                                        setActiveTab={setActiveTab}
                                    />
                                }
                            > { orgTree[0].children && 
                                <Card items={orgTree[0].children} setOpenDetails={setOpenDetails} setIdentifier={setIdentifier} setActiveTab={setActiveTab} />
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
