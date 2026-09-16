import { Priority } from "../generated/prisma/enums";

export const getPriority = (priority: string) => {
    let _priority;
    switch (priority) {
        case 'LOW':
            _priority = Priority.LOW
            break;
        case 'MEDIUM':
            _priority = Priority.MEDIUM
            break;
        case 'HIGH':
            _priority = Priority.HIGH
            break;
        default:
            _priority = Priority.LOW
            break;
    }
    return _priority;
}