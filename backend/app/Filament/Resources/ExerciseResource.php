<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExerciseResource\Pages;
use App\Filament\Resources\ExerciseResource\RelationManagers;
use App\Models\Exercise;
use Filament\Forms;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ExerciseResource extends Resource
{
    protected static ?string $model = Exercise::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-fire';
    
    protected static ?string $navigationLabel = 'Exercise Library';
    
    protected static ?string $recordTitleAttribute = 'name';
    
    protected static ?string $navigationGroup = 'Workout Management';
    
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()
                    ->schema([
                        Section::make('Exercise Preview')
                            ->schema([
                                FileUpload::make('images')
                                    ->disk('public')
                                    ->directory('exercises')
                                    ->multiple()
                                    ->label('Exercise Images')
                                    ->image()
                                    ->imageEditor()
                                    ->maxFiles(5)
                                    ->columnSpanFull()
                                    ->downloadable()
                                    ->reorderable()
                                    ->openable()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/gif'])
                                    ->helperText('Upload up to 5 images (JPG, PNG or GIF)')
                            ])
                            ->collapsible()
                            ->compact(),
                            
                        Tabs::make('Exercise Details')
                            ->tabs([
                                Tabs\Tab::make('Basic Information')
                                    ->icon('heroicon-m-information-circle')
                                    ->schema([
                                        TextInput::make('name')
                                            ->required()
                                            ->label('Exercise Name')
                                            ->placeholder('Enter exercise name')
                                            ->maxLength(255)
                                            ->columnSpanFull(),
        
                                        TextInput::make('custom_id')
                                            ->required()
                                            ->unique(ignoreRecord: true)
                                            ->label('Exercise ID')
                                            ->placeholder('Unique exercise identifier')
                                            ->helperText('This ID must be unique across all exercises')
                                            ->prefix('EX-')
                                            ->maxLength(50)
                                            ->prefixIcon('heroicon-m-identification'),
        
                                        Select::make('category')
                                            ->required()
                                            ->label('Category')
                                            ->searchable()
                                            ->native(false)
                                            ->options([
                                                'strength' => 'Strength',
                                                'cardio' => 'Cardio',
                                                'flexibility' => 'Flexibility',
                                                'balance' => 'Balance',
                                                'plyometric' => 'Plyometric',
                                                'functional' => 'Functional',
                                            ])
                                            ->prefixIcon('heroicon-m-tag'),
                                    ]),
        
                               Tabs\Tab::make('Exercise Properties')
                                    ->icon('heroicon-m-adjustments-horizontal')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Select::make('force')
                                                    ->options([
                                                        'push' => 'Push',
                                                        'pull' => 'Pull',
                                                        'static' => 'Static',
                                                    ])
                                                    ->required()
                                                    ->label('Force')
                                                    ->searchable()
                                                    ->native(false)
                                                    ->prefixIcon('heroicon-m-bolt'),
        
                                                Select::make('level')
                                                    ->options([
                                                        'beginner' => 'Beginner',
                                                        'intermediate' => 'Intermediate',
                                                        'advanced' => 'Advanced',
                                                        'elite' => 'Elite',
                                                    ])
                                                    ->required()
                                                    ->label('Level')
                                                    ->searchable()
                                                    ->native(false)
                                                    ->prefixIcon('heroicon-m-arrow-trending-up'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Select::make('mechanic')
                                                    ->options([
                                                        'compound' => 'Compound',
                                                        'isolation' => 'Isolation',
                                                        'cardio' => 'Cardio',
                                                        'bodyweight' => 'Bodyweight',
                                                    ])
                                                    ->required()
                                                    ->label('Mechanic')
                                                    ->searchable()
                                                    ->native(false)
                                                    ->prefixIcon('heroicon-m-cog'),
        
                                                TextInput::make('equipment')
                                                    ->required()
                                                    ->label('Equipment')
                                                    ->placeholder('Required equipment')
                                                    ->maxLength(255)
                                                    ->prefixIcon('heroicon-m-cube'),
                                            ]),
                                    ]),
        
                                Tabs\Tab::make('Muscles')
                                    ->icon('heroicon-m-user')
                                    ->schema([
                                        Repeater::make('primary_muscles')
                                            ->schema([
                                                Select::make('muscle')
                                                    ->required()
                                                    ->label('Primary Muscle')
                                                    ->options([
                                                        'Chest' => 'Chest',
                                                        'Back' => 'Back',
                                                        'Shoulders' => 'Shoulders',
                                                        'Biceps' => 'Biceps',
                                                        'Triceps' => 'Triceps',
                                                        'Legs' => 'Legs',
                                                        'Core' => 'Core',
                                                        'Glutes' => 'Glutes',
                                                        'Forearms' => 'Forearms',
                                                        'Calves' => 'Calves',
                                                        'Hamstrings' => 'Hamstrings',
                                                        'Quadriceps' => 'Quadriceps',
                                                    ])
                                                    ->searchable()
                                                    ->native(false)
                                            ])
                                            ->label('Primary Muscles')
                                            ->collapsible()
                                            ->itemLabel(fn (array $state): ?string => $state['muscle'] ?? null)
                                            ->columns(2)
                                            ->maxItems(4)
                                            ->createItemButtonLabel('Add Primary Muscle'),
        
                                        Repeater::make('secondary_muscles')
                                            ->schema([
                                                Select::make('muscle')
                                                    ->label('Secondary Muscle')
                                                    ->options([
                                                        'Chest' => 'Chest',
                                                        'Back' => 'Back',
                                                        'Shoulders' => 'Shoulders',
                                                        'Biceps' => 'Biceps',
                                                        'Triceps' => 'Triceps',
                                                        'Legs' => 'Legs',
                                                        'Core' => 'Core',
                                                        'Glutes' => 'Glutes',
                                                        'Forearms' => 'Forearms',
                                                        'Calves' => 'Calves',
                                                        'Hamstrings' => 'Hamstrings',
                                                        'Quadriceps' => 'Quadriceps',
                                                    ])
                                                    ->searchable()
                                                    ->native(false)
                                            ])
                                            ->label('Secondary Muscles')
                                            ->collapsible()
                                            ->itemLabel(fn (array $state): ?string => $state['muscle'] ?? null)
                                            ->columns(2)
                                            ->maxItems(4)
                                            ->createItemButtonLabel('Add Secondary Muscle'),
                                    ]),
        
                                Tabs\Tab::make('Instructions')
                                    ->icon('heroicon-m-document-text')
                                    ->schema([
                                        Textarea::make('instructions')
                                            ->required()
                                            ->label('Instructions')
                                            ->placeholder('Step-by-step exercise instructions')
                                            ->rows(5)
                                            ->columnSpanFull()
                                            ->helperText('Provide clear, detailed instructions for performing this exercise correctly'),
                                    ]),
                            ])
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('images')
                    ->label('Images')
                    ->disk('public')
                    ->getStateUsing(fn ($record) => 
                        collect($record->images)
                            ->map(fn ($path) => asset("storage/exercises/{$path}"))
                            ->filter()
                            ->toArray()
                    )
                    ->stacked()
                    ->circular()
                    ->limit(1)
                    ->size(50)
                    ->defaultImageUrl(asset('images/placeholder-exercise.png')),

                TextColumn::make('name')
                    ->label('Exercise Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn ($record) => $record->category)
                    ->wrap(),

                TextColumn::make('force')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'push' => 'primary',
                        'pull' => 'success',
                        'static' => 'warning',
                        default => 'gray',
                    })
                    ->icon('heroicon-m-bolt')
                    ->tooltip('Force Type')
                    ->searchable(),

                TextColumn::make('level')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'beginner' => 'success',
                        'intermediate' => 'warning',
                        'advanced' => 'danger',
                        'elite' => 'purple',
                        default => 'gray',
                    })
                    ->icon('heroicon-m-arrow-trending-up')
                    ->tooltip('Difficulty Level')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('mechanic')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'compound' => 'warning',
                        'isolation' => 'info',
                        'cardio' => 'success',
                        'bodyweight' => 'primary',
                        default => 'gray',
                    })
                    ->icon('heroicon-m-cog')
                    ->toggleable()
                    ->tooltip('Exercise Mechanic')
                    ->searchable(),

                TextColumn::make('equipment')
                    ->badge()
                    ->color('secondary')
                    ->icon('heroicon-m-cube')
                    ->tooltip('Required Equipment')
                    ->searchable(),

                TextColumn::make('primary_muscles')
                    ->label('Primary Muscles')
                    ->formatStateUsing(fn ($state) => $state ? implode(', ', array_column(json_decode($state, true), 'muscle')) : '-')
                    ->wrap()
                    ->icon('heroicon-m-fire')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),

                TextColumn::make('secondary_muscles')
                    ->label('Secondary Muscles')
                    ->formatStateUsing(fn ($state) => $state ? implode(', ', array_column(json_decode($state, true), 'muscle')) : '-')
                    ->wrap()
                    ->icon('heroicon-m-sparkles')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),

                TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'strength' => 'danger',
                        'cardio' => 'success',
                        'flexibility' => 'info',
                        'balance' => 'warning',
                        'plyometric' => 'purple',
                        'functional' => 'orange',
                        default => 'gray',
                    })
                    ->icon('heroicon-m-tag')
                    ->toggleable()
                    ->tooltip('Exercise Category')
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->options([
                        'strength' => 'Strength',
                        'cardio' => 'Cardio',
                        'flexibility' => 'Flexibility',
                        'balance' => 'Balance',
                        'plyometric' => 'Plyometric',
                        'functional' => 'Functional',
                    ])
                    ->label('Category')
                    ->indicator('Category'),
                    
                SelectFilter::make('level')
                    ->options([
                        'beginner' => 'Beginner',
                        'intermediate' => 'Intermediate',
                        'advanced' => 'Advanced',
                        'elite' => 'Elite',
                    ])
                    ->label('Difficulty Level')
                    ->indicator('Level'),
                    
                SelectFilter::make('mechanic')
                    ->options([
                        'compound' => 'Compound',
                        'isolation' => 'Isolation',
                        'cardio' => 'Cardio',
                        'bodyweight' => 'Bodyweight',
                    ])
                    ->label('Mechanic')
                    ->indicator('Mechanic'),
            ])
            ->actions([
                ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
                ->icon('heroicon-m-ellipsis-vertical')
                ->tooltip('Actions'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ])
            ->emptyStateIcon('heroicon-o-fire')
            ->emptyStateHeading('No exercises yet')
            ->emptyStateDescription('Create your first exercise to get started')
            ->emptyStateActions([
                Tables\Actions\CreateAction::make()
                    ->label('Create Exercise')
                    ->icon('heroicon-m-plus'),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListExercises::route('/'),
            'create' => Pages\CreateExercise::route('/create'),
            'edit' => Pages\EditExercise::route('/{record}/edit'),
        ];
    }
    
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}
