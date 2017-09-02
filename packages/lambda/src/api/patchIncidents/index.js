import { Incident } from 'model/incidents'
import SNS from 'aws/sns'

export async function handle (event, context, callback) {
  try {
    const params = Object.assign({}, {incidentID: event.params.incidentid}, event.body)
    const incident = new Incident(params)
    await incident.validate()
    await incident.save()

    await new SNS().notifyIncident(incident)

    const obj = incident.objectify()
    const comps = obj.components
    delete obj.components
    callback(null, {
      incident: obj,
      components: comps
    })
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
    switch (error.name) {
      case 'ValidationError':
        callback('Error: ' + error.message)
        break
      case 'NotFoundError':
        callback('Error: an item not found')
        break
      default:
        callback('Error: failed to update the incident')
    }
  }
}
