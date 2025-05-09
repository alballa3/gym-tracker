import { WorkoutFormState } from '@/types/workout';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

export async function storeWorkout(state: any) {
    try {
        await Filesystem.stat({
            path: 'workout',
            directory: Directory.Data,
        })
    } catch (error) {
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
export async function storeTemplate(state: any) {
    try {
        await Filesystem.stat({
            path: 'template',
            directory: Directory.Data,
        })
    } catch (error) {
        await Filesystem.mkdir({
            path: 'template',
            directory: Directory.Data,
            recursive: true,
        });
    }

    await Filesystem.writeFile({
        path: `template/${state.id}.json`,
        data: JSON.stringify(state),
        directory: Directory.Data,
        encoding: Encoding.UTF8
    });
}
export async function getWorkout(id: string) {
    let file = await Filesystem.readFile({
        path: `workout/${id}.json`,
        directory: Directory.Data,
        encoding: Encoding.UTF8
    })
    let data: WorkoutFormState = JSON.parse(file.data as string)
    data.saveAsTemplate = false;
    data.exercises.map((execures) => {
        execures.previousData = {
            date: new Date(Number(data.created_at)).toISOString(),
            sets: execures.sets.map((set) => ({ ...set })), // deep clone each set
        }
        execures.sets.map((set) => {
            set.isCompleted = false;
            set.reps = 1
            set.weight = 1
            return set
        })
    })
}