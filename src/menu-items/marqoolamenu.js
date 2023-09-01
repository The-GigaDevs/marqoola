// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconSettings, IconChartHistogram, IconRobot, IconMailbox, IconShoppingCart } from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconSettings,
    IconChartHistogram,
    IconRobot,
    IconMailbox,
    IconShoppingCart
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const marqoolamenu = {
    id: 'header',
    title: <FormattedMessage id="Application" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'tasks',
            title: <FormattedMessage id="Tasks" />,
            type: 'collapse',
            
            icon: icons.IconMailbox,
            breadcrumbs: false,
            children: [
                {
                    id: 'controlassessments',
                    title: <FormattedMessage id="Control Assessments" />,
                    type: 'item',
                    url: '/underconstruction',
                    breadcrumbs: false,
                },
                {
                    id: 'incident',
                    title: <FormattedMessage id="Raise Incident" />,
                    type: 'item',
                    url: '/underconstruction',
                    breadcrumbs: false,
                },{
                    id: 'alerts',
                    title: <FormattedMessage id="Alerts" />,
                    type: 'item',
                    url: '/underconstruction',
                    breadcrumbs: false,
                }
            ]
        },{
            id: 'riskuniverse',
            title: <FormattedMessage id="Risk Universe" />,
            type: 'collapse',
            
            icon: icons.IconDashboard,
            breadcrumbs: false,
            children: [
                {
                    id: 'organisations',
                    title: <FormattedMessage id="Organizations" />,
                    type: 'item',
                    url: '/organisations',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'assets',
                    title: <FormattedMessage id="Assets" />,
                    type: 'item',
                    url: '/assets',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'objectives',
                    title: <FormattedMessage id="Objectives" />,
                    type: 'item',
                    url: '/objectives',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'risks',
                    title: <FormattedMessage id="Risks" />,
                    type: 'item',
                    url: '/risks',
                    
                    breadcrumbs: false,
                },
                
                {
                    id: 'controls',
                    title: <FormattedMessage id="Control Templates" />,
                    type: 'item',
                    url: '/controls',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'controlimplementations',
                    title: <FormattedMessage id="Control Implementations" />,
                    type: 'item',
                    url: '/controlimplementations',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'squids',
                    title: <FormattedMessage id="sQuids" />,
                    type: 'item',
                    url: '/squids',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'incidents',
                    title: <FormattedMessage id="Incidents" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                }
                /*
                {
                    id: 'vendors',
                    title: <FormattedMessage id="Vendors" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'processes',
                    title: <FormattedMessage id="Processes" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'legalentities',
                    title: <FormattedMessage id="Legal Entities" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'cyberriskportfolio',
                    title: <FormattedMessage id="Cyber Risk Portfolio" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                },{
                    id: 'controlsportfolio',
                    title: <FormattedMessage id="Controls Portfolio" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                }, 
                ,{
                    id: 'indicators',
                    title: <FormattedMessage id="Indicators" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                },{
                    id: 'actionitems',
                    title: <FormattedMessage id="Action Items" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                }*/
                
                
            ]
        },
        {
            id: 'dashboards',
            title: <FormattedMessage id="Dashboards" />,
            type: 'collapse',
            
            icon: icons.IconChartHistogram,
            breadcrumbs: false,
            children: [
                {
                    id: 'currentrisk',
                    title: <FormattedMessage id="Current Risk" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'soa',
                    title: <FormattedMessage id="SOA" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                }
            ]
        },
        {
            id: 'integrations',
            title: <FormattedMessage id="Integrations" />,
            type: 'collapse',
            
            icon: icons.IconRobot,
            breadcrumbs: false,
            children: [
                {
                    id: 'repository',
                    title: <FormattedMessage id="Repository" />,
                    type: 'item',
                    url: '/integrations',
                    
                    breadcrumbs: false,
                },
                {
                    id: 'logs',
                    title: <FormattedMessage id="Logs" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                },{
                    id: 'connectors',
                    title: <FormattedMessage id="Connectors" />,
                    type: 'item',
                    url: '/underconstruction',
                    
                    breadcrumbs: false,
                }
            ]
        },
        {
            id: 'marketplace',
            title: <FormattedMessage id="Marketplace" />,
            type: 'item',
            url: '/underconstruction',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: <FormattedMessage id="Settings" />,
            type: 'collapse',
            url: '/underconstruction',
            icon: icons.IconSettings,
            breadcrumbs: false,
            children: [
                {
                    id: 'Enumerations',
                    title: <FormattedMessage id="Enumerations" />,
                    type: 'item',
                    url: '/settings',
                    icon: icons.IconShoppingCart,
                    breadcrumbs: false
                },
                {
                    id: 'mastertables',
                    title: <FormattedMessage id="Master Tables" />,
                    type: 'collapse',
                    breadcrumbs: false,
                    children :[ 
                        {
                            id: 'securityconcepts',
                            title: <FormattedMessage id="Security Concepts" />,
                            type: 'item',
                            url: '/securityconcepts/master',
                            breadcrumbs: false,
                        },
                        {
                            id: 'controlcategories',
                            title: <FormattedMessage id="Control Categories" />,
                            type: 'item',
                            url: '/controlcategories/master',
                            breadcrumbs: false,
                        }
                    ]
                }
            ]
        }
    ]
};

export default marqoolamenu;
