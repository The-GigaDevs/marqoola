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
            id: 'default',
            title: <FormattedMessage id="Tasks" />,
            type: 'collapse',
            
            icon: icons.IconMailbox,
            breadcrumbs: false,
            children: [
                {
                    id: 'controlassessments',
                    title: <FormattedMessage id="Control Assessments" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },
                {
                    id: 'incident',
                    title: <FormattedMessage id="Raise Incident" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },{
                    id: 'alerts',
                    title: <FormattedMessage id="Alerts" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                }
            ]
        },{
            id: 'default',
            title: <FormattedMessage id="Risk Universe" />,
            type: 'collapse',
            
            icon: icons.IconDashboard,
            breadcrumbs: false,
            children: [
                {
                    id: 'controlassessments',
                    title: <FormattedMessage id="Organizations" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },
                {
                    id: 'incident',
                    title: <FormattedMessage id="Objectives" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },
                {
                    id: 'alerts',
                    title: <FormattedMessage id="Assets" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },
                {
                    id: 'vendors',
                    title: <FormattedMessage id="Vendors" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },
                {
                    id: 'alerts',
                    title: <FormattedMessage id="Processes" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },
                {
                    id: 'alerts',
                    title: <FormattedMessage id="Legal Entities" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },
                {
                    id: 'alerts',
                    title: <FormattedMessage id="Cyber Riks Portfolio" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },{
                    id: 'alerts',
                    title: <FormattedMessage id="Controls Portfolio" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },{
                    id: 'alerts',
                    title: <FormattedMessage id="Incidents" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },{
                    id: 'alerts',
                    title: <FormattedMessage id="Indicators" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },{
                    id: 'alerts',
                    title: <FormattedMessage id="Action Items" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                }
            ]
        },
        {
            id: 'default',
            title: <FormattedMessage id="Dashboards" />,
            type: 'collapse',
            
            icon: icons.IconChartHistogram,
            breadcrumbs: false,
            children: [
                {
                    id: 'controlassessments',
                    title: <FormattedMessage id="Current Risk" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },
                {
                    id: 'incident',
                    title: <FormattedMessage id="SOA" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                }
            ]
        },
        {
            id: 'default',
            title: <FormattedMessage id="Integrations" />,
            type: 'collapse',
            
            icon: icons.IconRobot,
            breadcrumbs: false,
            children: [
                {
                    id: 'controlassessments',
                    title: <FormattedMessage id="Repository" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },
                {
                    id: 'incident',
                    title: <FormattedMessage id="Logs" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                },{
                    id: 'alerts',
                    title: <FormattedMessage id="Connectors" />,
                    type: 'item',
                    url: '/',
                    icon: icons.IconDashboard,
                    breadcrumbs: false,
                }
            ]
        },
        {
            id: 'marketplace',
            title: <FormattedMessage id="Marketplace" />,
            type: 'item',
            url: '/',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: <FormattedMessage id="Settings" />,
            type: 'item',
            url: '/',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default marqoolamenu;
