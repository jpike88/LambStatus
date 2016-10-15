import webpackConfig from '../build/webpack.config'
import configGen from '../config'

export let statusPageConfig = configGen()

statusPageConfig.utils_paths.entry_point = statusPageConfig.utils_paths.client('status-page.js')

// Pages for general users should not contain api info.
delete statusPageConfig.globals['__API_URL__']
delete statusPageConfig.globals['__API_KEY__']

statusPageConfig.utils_paths.dist = statusPageConfig.utils_paths.dist.bind(null, 'status-page')

statusPageConfig.server_port += 1 

export const webpackStatusPageConfig = webpackConfig(statusPageConfig)