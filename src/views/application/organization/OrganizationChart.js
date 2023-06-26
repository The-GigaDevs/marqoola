import PropTypes from 'prop-types';
import { useEffect, Fragment } from 'react';

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

const data = [
    {
        id: '1',
        name: 'My Organisation',
        role: 'Organisation',
        avatar: 'https://i.pravatar.cc/100?img=3',
        linkedin: 'https://www.linkedin.com/',
        meet: 'https://meet.google.com/',
        skype: 'https://www.skype.com/en/',
        children: [
            {
                id: '2',
                name: 'Division 1',
                role: 'Division',
                avatar: 'https://i.pravatar.cc/100?img=1',
                linkedin: 'https://www.linkedin.com/',
                meet: 'https://meet.google.com/',
                skype: 'https://www.skype.com/en/',
                children: [
                    {
                        id: '3',
                        name: 'Department 1',
                        role: 'Department',
                        avatar: 'https://i.pravatar.cc/100?img=2',
                        linkedin: 'https://www.linkedin.com/',
                        meet: 'https://meet.google.com/',
                        skype: 'https://www.skype.com/en/'
                    }
                ]
            },
            {
                id: '4',
                name: 'Division 2',
                role: 'Division',
                avatar: 'https://i.pravatar.cc/100?img=4',
                linkedin: 'https://www.linkedin.com/',
                meet: 'https://meet.google.com/',
                skype: 'https://www.skype.com/en/',

                children: [
                    {
                        id: '5',
                        name: 'Department 2',
                        role: 'Department',
                        avatar: 'https://i.pravatar.cc/100?img=5',
                        linkedin: 'https://www.linkedin.com/',
                        meet: 'https://meet.google.com/',
                        skype: 'https://www.skype.com/en/',

                        children: [
                            {
                                id: '6',
                                name: 'Department 5',
                                role: 'Department',
                                avatar: 'https://i.pravatar.cc/100?img=6',
                                linkedin: 'https://www.linkedin.com/',
                                meet: 'https://meet.google.com/',
                                skype: 'https://www.skype.com/en/',
                                children: [
                                    {
                                        id: '7',
                                        name: 'Department 6',
                                        role: 'Department',
                                        avatar: 'https://i.pravatar.cc/100?img=6',
                                        linkedin: 'https://www.linkedin.com/',
                                        meet: 'https://meet.google.com/',
                                        skype: 'https://www.skype.com/en/'
                                    },
                                    {
                                        id: '8',
                                        name: 'Department 7',
                                        role: 'Department',
                                        avatar: 'https://i.pravatar.cc/100?img=7',
                                        linkedin: 'https://www.linkedin.com/',
                                        meet: 'https://meet.google.com/',
                                        skype: 'https://www.skype.com/en/'
                                    }
                                ]
                            },
                            {
                                id: '9',
                                name: 'Department 15',
                                role: 'Department',
                                avatar: 'https://i.pravatar.cc/100?img=7',
                                linkedin: 'https://www.linkedin.com/',
                                meet: 'https://meet.google.com/',
                                skype: 'https://www.skype.com/en/'
                            }
                        ]
                    }
                ]
            },
            {
                id: '10',
                name: 'Division 3',
                role: 'Division',
                avatar: 'https://i.pravatar.cc/100?img=8',
                linkedin: 'https://www.linkedin.com/',
                meet: 'https://meet.google.com/',
                skype: 'https://www.skype.com/en/',

                children: [
                    {
                        id: '11',
                        name: 'Department 3',
                        role: 'Department',
                        avatar: 'https://i.pravatar.cc/100?img=6',
                        linkedin: 'https://www.linkedin.com/',
                        meet: 'https://meet.google.com/',
                        skype: 'https://www.skype.com/en/'
                    },
                    {
                        id: '12',
                        name: 'Department 4',
                        role: 'Department',
                        avatar: 'https://i.pravatar.cc/100?img=7',
                        linkedin: 'https://www.linkedin.com/',
                        meet: 'https://meet.google.com/',
                        skype: 'https://www.skype.com/en/'
                    }
                ]
            }
        ]
    }
];

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

    useEffect(() => {
        dispatch(openDrawer(false));
        
        // eslint-disable-next-line
    }, []);

    return (
        <Grid container rowSpacing={2} justifyContent="center">
            {/* 
            <Grid item md={12} lg={12} xs={12}>
                <CardMui>
                    <CardHeader title="Organization Chart" />
                </CardMui>
            </Grid> */ }
            <Grid item md={12} lg={12} xs={12}>
                <Grid container spacing={2}>
                    {/* 
                    <Grid item md={12} lg={12} xs={12}>
                        <MainCard title="Simple Chart" sx={{ overflow: 'auto' }}>
                            <Tree
                                lineWidth="1px"
                                lineColor={theme.palette.secondary.main}
                                lineBorderRadius="10px"
                                label={<SimpleTree name={data[0].name} />}
                            >
                                <TreeCard items={data[0].children} />
                            </Tree>
                        </MainCard>
                    </Grid> */ }
                    <Grid item md={12} lg={12} xs={12}>
                        <MainCard  sx={{ overflow: 'auto' }}>
                            <Tree
                                lineWidth="1px"
                                lineColor={theme.palette.secondary.main}
                                lineBorderRadius="10px"
                                label={
                                    <DataCard
                                        name={data[0].name}
                                        role={data[0].role}
                                        id={data[0].id}
                                        linkedin={data[0].linkedin}
                                        meet={data[0].meet}
                                        skype={data[0].skype}
                                        root

                                    />
                                }
                            >
                                <Card items={data[0].children} />
                            </Tree>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

OrganizationChart.propTypes = {
    rows: PropTypes.array,
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default OrganizationChart;
