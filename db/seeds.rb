require 'csv'

csv_text = File.read(Rails.root.join('lib', 'seeds', 'CSV_Data.csv'))
csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
csv.each do |row|
	# Seed mapping table
	mapping = Mapping.find_or_create_by(name: row['Mapping'])

  # Seed role table
	role = Role.find_or_create_by(name: row['Role'])

	# Seed questions table
	Question.find_or_create_by(name: row['Question'], role_id: role.id, mapping_id: mapping.id)
end