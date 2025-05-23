import { WorkoutFormState } from '@/types/workout';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

export async function storeWorkout(state: any) {
    try {
        await Filesystem.stat({
            path: 'workout/',
            directory: Directory.Data,
        })
        console.log('workout directory exists')
    } catch (error) {
        console.log('workout directory does not exist', error)
        await Filesystem.mkdir({
            path: 'workout',
            directory: Directory.Data,
            recursive: true,
        });
    }

    await Filesystem.writeFile({
        path: `workout/${state.id}.json`,
        data: JSON.stringify(state),
        directory: Directory.Data,
        encoding: Encoding.UTF8
    });
}
export async function getWorkout(id: string) {
    let file = await Filesystem.readdir({
        path: `workout/`,
        directory: Directory.Data,
    })
    let workouts = []
    for (const fileName of file.files) {
        let file = await Filesystem.readFile({
            path: `workout/${fileName.name}`,
            directory: Directory.Data,
            encoding: Encoding.UTF8
        });
        let workout: WorkoutFormState = JSON.parse(file.data as string)
        if (workout.name !== id) {
            continue;
        }
        workouts.push(workout)
    }
    return workouts
}
export async function getAllTemplate() {
    let file = await Filesystem.readdir({
        path: `workout/`,
        directory: Directory.Data,
    })
    let workouts = []
    for (const fileName of file.files) {
        let file = await Filesystem.readFile({
            path: `workout/${fileName.name}`,
            directory: Directory.Data,
            encoding: Encoding.UTF8
        });
        let workout: WorkoutFormState = JSON.parse(file.data as string)
        if (!workout.is_template) {
            continue;
        }
        workouts.push(workout)
    }
    return workouts
}

export async function getAllWorkouts() {
    let file = await Filesystem.readdir({
        path: `workout/`,
        directory: Directory.Data,
    })
    let workouts = []
    for (const fileName of file.files) {
        let file = await Filesystem.readFile({
            path: `workout/${fileName.name}`,
            directory: Directory.Data,
            encoding: Encoding.UTF8
        });
        let workout: WorkoutFormState = JSON.parse(file.data as string)
        if (workout.is_template) {
            continue;
        }
        workouts.push(workout)
    }
    return workouts
}