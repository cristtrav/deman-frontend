export interface ToolbarButton {
    label: string
    type?: 'primary' | 'default'
    actionFn?: () => any
    danger?: boolean
    icon?: string
}