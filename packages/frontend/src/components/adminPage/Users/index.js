import React from 'react'
import classnames from 'classnames'
import classes from './Users.scss'
import { userPoolId } from 'utils/settings'

export default class Users extends React.Component {
  render () {
    const region = userPoolId.match(/^[a-z0-9-]+/)
    if (!region) {
      console.warn('user pool id has unexpected format:', region)
    }
    const linkToUsersPage = `https://${region}.console.aws.amazon.com/cognito/users?region=${region}#/pool/${userPoolId}/users`
    return (<div className={classnames(classes.layout, 'mdl-grid')}>
      <div className='mdl-cell mdl-cell--12-col'>
        <h4>Users</h4>
      </div>
      <div className='mdl-cell mdl-cell--12-col'>
        Access
        <a href={linkToUsersPage} className={classes.link} target='_blank'>
          the Amazon Cognito Management Console
        </a>
        to manage the users of the admin page. Please see
        <a href='https://github.com/ks888/LambStatus/wiki/Create-a-new-user' className={classes.link} target='_blank'>
          the document
        </a>
        to create a new user.
      </div>
    </div>)
  }
}
